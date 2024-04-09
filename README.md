# fetch-bug-fix

You are given a small HTML app. The Pokémon API is used to fetch a list of Pokémon names from the API. Currently, the search feature doesn't work. Your task is to build it.

Break your problems into questions that you can research.

## Constraints

1. Don't save data from the API locally (imagine there were millions of Pokémon).

## Goal

1. Create an input field where a user can type a search query.
2. Whenever the text changes in that input field, retrieve all Pokémon whose names contain the input text.
3. Render a list of Pokémon names that updates every time there is a change to the input text.

## Bonus

1. Render each Pokémon's picture under its name.
2. Create an empty view for when nothing comes up in the search or the page freshly loads.
3. Limit updates (new fetches from API) to only trigger 300 milliseconds after the user stops typing(look into debouncing). If the user keeps typing before 300ms have passed, reset the timer.
