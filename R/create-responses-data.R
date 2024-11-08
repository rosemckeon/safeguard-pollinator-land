library(tidyverse)
library(rjson)

#' @author C. Rose McKeon 
#' @description Takes data as a CSV, subsets what we need for the game, creates distributions to sample scores from and outputs as json.


scores <- readr::read_csv(file.path("R", "meanscores.csv")) %>%
  dplyr::mutate(
    Row = as.factor(Row), 
    Column = as.factor(Column), 
    Landuse = factor(Landuse, levels = c("Snh", "Agr", "Urb"), labels = c("Semi-natural", "Agricultural", "Urban"))
  ) %>%
  dplyr::rename(
    from = "Row",
    to = "Column",
    habitatType = "Landuse",
    scoreType = "Type",
    mean = "Value.mean",
    min = "Value.min",
    max = "Value.max",
    sd = "Value.sd"
  ) %>%
  dplyr::select(habitatType, scoreType, from, to, mean, min, max, sd)

scores

scores$from %>% levels()

from_responses_to_keep <- c(
  "1. Recreate restore ec zone",
  "3. Nature prot reg",
  "7. Urban greening",
  "10. Ecol intensification"
)

from_responses_new_names <- c(
  "restoration",
  "natureProtection",
  "urbanGreening",
  "EcoIntensification"
)

from_states_to_keep <- c(
  "1. WP abund and div D",
  "3. Flor res. on WP I",
  "4. Habitat res. on WP I"
)

from_states_new_names <- c(
  "wildPollinators",
  "floralResources",
  "habitatResources"
)

scores$to %>% levels()

to_states_to_keep <- c(
  "Wild.pol.score",
  "Wild.poll.score",
  "Flor.res.score",
  "Flor.score",
  "Habitat.score"
)

to_states_new_names <- c(
  "wildPollinators",
  "wildPollinators",
  "floralResources",
  "floralResources",
  "habitatResources"
)

to_impacts_to_keep <- c(
  "Crop.poll.score",
  "Econ.val.score",
  "W.pl.poll.score",
  "Aest.score"
)

to_impacts_new_names <- c(
  "cropPollinationProduction",
  "economicValueChain",
  "wildPlantPollination",
  "aestheticValues"
)

N <- 100

response_on_state <- scores %>%
  dplyr::filter(scoreType == "RS") %>%
  dplyr::filter(from %in% from_responses_to_keep & to %in% to_states_to_keep) %>%
  dplyr::mutate(
    from = factor(from, levels = from_responses_to_keep, labels = from_responses_new_names),
    to = factor(to, levels = to_states_to_keep, labels = to_states_new_names),
    dist = purrr::map2(mean, sd, rnorm, n = N),
    dist = purrr::map(dist, round),
    range = purrr::map2(min, max, function(min, max){
      return(c(min, max))
    }),
    values = purrr::map2(dist, range, function(dist, range){
      # trim based on min and max values of real expert scores
      output <- dist[which(dplyr::between(dist, range[1], range[2]))]
      # replace values that exceeded range with top/bottom scores
      if(length(output) < N){
        trimmed <- dist[which(!dplyr::between(dist, range[1], range[2]))]
        if(min(trimmed) < range[1]){
          output <- c(output, rep(range[1], length(trimmed[which(trimmed < range[1])])))
        }
        if(max(trimmed) > range[2]){
          output <- c(output, rep(range[2], length(trimmed[which(trimmed > range[2])])))
        }
      }
      return(output)
    })
  )

response_on_state 

response_on_state[2,]$values[[1]] %>% hist()

response_on_state %>%
  dplyr::select(-scoreType, -dist, -range) %>%
  dplyr::rename(response = "from", state = "to") %>%
  readr::write_csv(file.path("R", "response-on-state.csv"))
  
response_on_state %>% 
  dplyr::select(-scoreType, -dist, -range) %>%
  dplyr::rename(response = "from", state = "to") %>%
  dplyr::group_by(habitatType, response) %>% 
  tidyr::nest(.key = "state") %>% 
  dplyr::group_by(habitatType) %>% 
  tidyr::nest(.key = "response") %>%
  rjson::toJSON() %>%
  write(file.path("R", "response-on-state.json"))
