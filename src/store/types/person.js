import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "person",
  initialState: {
    currentPerson: {
      data: null,
      isLoading: false,
    },
  },
  reducers: {
    personRequested: (person, action) => {
      person.currentPerson.isLoading = true;
    },
    personReceived: (person, action) => {
      const { payload: actor } = action;
      person.currentPerson.data = {
        name: actor.name,
        image: actor.profile_path,
        birthday: actor.birthday,
        deathday: actor.deathday,
        birthplace: actor.place_of_birth,
        overview: actor.biography,
        movie_credits: actor.combined_credits.cast.filter(
          (row) => row.media_type === "movie"
        ),
        tv_credits: actor.combined_credits.cast.filter(
          (row) => row.media_type === "tv"
        ),
      };
      person.currentPerson.isLoading = false;
    },
    personRequestFailed: (person, action) => {
      person.currentPerson.isLoading = false;
    },
  },
});

const url = "/person";

export const loadSingularPerson = (personId) => async (dispatch, getState) => {
  const { people: peopleViewed } = getState().viewed;
  const person =
    peopleViewed && peopleViewed.find((person) => person.id === personId);
  console.log(person);
  await dispatch(
    apiCallBegan({
      url: `${url}/${personId}`,
      params: {
        append_to_response: "combined_credits",
      },
      onStart: personRequested.type,
      onSuccess: personReceived.type,
      onError: personRequestFailed.type,
    })
  );
};

const { personRequested, personReceived, personRequestFailed } = slice.actions;
export default slice.reducer;
