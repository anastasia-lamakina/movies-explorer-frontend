import { MAIN_API_URL, MOVIES_FILE_URL } from "./constants";

export const postUserSignup = ({ name, email, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(`${MAIN_API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        resolve();
      } else {
        reject(await res.json());
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const postUserSignin = async ({ email, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(`${MAIN_API_URL}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.ok) {
        resolve();
      } else {
        reject(await res.json());
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const getSavedMovies = () => {
  return new Promise(async (resolve) => {
    try {
      const res = await fetch(`${MAIN_API_URL}/movies`, {
        method: "GET",
        credentials: "include",
      });

      resolve(await res.json());
    } catch (error) {
      console.log(error);
    }
  });
};

export const deleteUnsaveMovie = (movieId) => {
  return new Promise(async (resolve) => {
    try {
      const res = await fetch(`${MAIN_API_URL}/movies/${movieId}`, {
        method: "DELETE",
        credentials: "include",
      });

      resolve(await res.json());
    } catch (error) {
      console.log(error);
    }
  });
};

export const postSaveMovie = ({
  country,
  director,
  duration,
  year,
  description,
  image,
  trailerLink,
  nameRU,
  nameEN,
  id,
}) => {
  return new Promise(async (resolve) => {
    try {
      const res = await fetch(`${MAIN_API_URL}/movies`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country,
          director,
          duration,
          year,
          description,
          image: `${MOVIES_FILE_URL}${image.url}`,
          trailer: trailerLink,
          thumbnail: `${MOVIES_FILE_URL}${image.url}`,
          nameRU,
          nameEN,
          movieId: id,
        }),
      });

      resolve();
    } catch (error) {
      console.log(error);
    }
  });
};

export const patchUserUpdate = ({ name, email }) => {
  return new Promise(async (resolve) => {
    try {
      const res = await fetch(`${MAIN_API_URL}/users/me`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
      });

      resolve(await res.json());
    } catch (error) {
      console.log(error);
    }
  });
};

export const getUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(`${MAIN_API_URL}/users/me`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        reject();
      } else {
        resolve(await res.json());
      }
    } catch (error) {
      console.log(error);
    }
  });
};

export const postLogout = () => {
  return new Promise(async (resolve) => {
    try {
      await fetch(`${MAIN_API_URL}/signout`, {
        method: "POST",
        credentials: "include",
      });

      resolve();
    } catch (error) {
      console.log(error);
    }
  });
};
