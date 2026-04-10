import axios from "axios";

const API_BASE_URL_V1 = "https://api.anywheretrips.in/v1";
const API_KEY = "urWQuAoOFwN2FeQGyXZys5eZzSOWYA9G";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL_V1,
  headers: {
    "x-api-key": API_KEY,
    "Content-Type": "application/json",
  },
});

export const signupUser = async (username: string, password: string) => {
  const response = await axiosInstance.post("/users/create", {
    username,
    password,
  });
  return response.data;
};

export const loginUser = async (username: string, password: string) => {
  const response = await axiosInstance.post("/users/auth/login", {
    username,
    password,
  });
  return response.data;
};

export const getUserProfile = async (token: string) => {
  const response = await axiosInstance.get("/users/me/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

export const uploadProfilePicture = async (token: string, file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post(
    "/users/me/upload-profile-picture",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data.data;
};

export const removeProfilePicture = async (token: string) => {
  const response = await axiosInstance.delete(
    "/users/me/remove-profile-picture",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const addToWishlist = async (token: string, packageId: string) => {
  const response = await axiosInstance.post(
    "/users/packages/wishlist",
    {
      package_id: packageId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const getWishlist = async (token: string) => {
  const response = await axiosInstance.get("/users/packages/wishlist", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const removeFromWishlist = async (token: string, packageId: string) => {
  const response = await axiosInstance.delete("/users/packages/wishlist", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      package_id: packageId,
    },
  });

  return response.data;
};

export const getPackages = async (isFeatured: boolean = false) => {
  let url = `${API_BASE_URL_V1}/packages`;

  if (isFeatured) url += "?isFeatured=True";

  const response = await axios.get(url, {
    headers: {
      "x-api-key": API_KEY,
    },
  });

  return response.data;
};

export const getCountries = async () => {
  let url = `${API_BASE_URL_V1}/content/countries`;

  const response = await axios.get(url, {
    headers: {
      "x-api-key": API_KEY,
    },
  });

  return response.data;
};
