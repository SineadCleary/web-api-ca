export const getMovies = async () => {
  const response = await fetch(
    'http://localhost:8080/api/movies'
    // , {
  //   headers: {
  //     'Authorization': "BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5ldyIsImlhdCI6MTczNDgxNDU3M30.4Sa4ltxvE2LgciOdvyktkhxUVa20ww9cM82BtJd4A8M"//window.localStorage.getItem('token')
  //   }
  // }
)
  return response.json();
};

export const getUpcoming = async () => {
  const response = await fetch(
    'http://localhost:8080/api/movies/tmdb/upcoming'
    // , {
  //   headers: {
  //     'Authorization': "BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5ldyIsImlhdCI6MTczNDgxNDU3M30.4Sa4ltxvE2LgciOdvyktkhxUVa20ww9cM82BtJd4A8M"//window.localStorage.getItem('token')
  //   }
  // }
)
  return response.json();
};

export const login = async (username, password) => {
  const response = await fetch('http://localhost:8080/api/users', {
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({ username: username, password: password })
  });
  return response.json();
};

export const signup = async (username, password) => {
  const response = await fetch('http://localhost:8080/api/users?action=register', {
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({ username: username, password: password })
  });
  return response.json();
};