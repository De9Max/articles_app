export const userLogin = async (credentials) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      if (data) {
        throw new Error(data.detail);
      }
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchUser = async (token) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const userProfile = await response.json();
    userProfile.token = token;
    return userProfile;
  } catch (error) {
    throw new Error('Error fetching user profile: ' + error.message);
  }
};
