import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react';

//api here is an axios instance which has the baseURL set according to the env.
import axios from 'axios';
import urls from 'constants/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState();
  const [districts, setDistricts] = useState();
  const [locations, setLocations] = useState();
  const [ads, setAds] = useState();

  async function loadUserFromCookies() {
    const token = Cookies.get('token');
    try {
      const { data: category } = await axios.get(`${urls['test']}/category`);
      setCategories(category.categories);
      const { data: district } = await axios.get(`${urls['test']}/district`);
      setDistricts(district);
      const { data: location } = await axios.get(`${urls['test']}/location`);
      setLocations(location);
    } catch (e) {
      console.log(e);
    }
    if (token && token != undefined) {
      try {
        const { data: data } = await axios.get(`${urls['test']}/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(data);
      } catch (error) {
        console.log(error.response.data.message);
        logout();
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    loadUserFromCookies();
  }, []);

  const login = async (email, password) => {
    const token = Cookies.get('token');

    if (!token) {
      try {
        const { data: data } = await axios.post(`${urls['test']}/auth/login`, {
          email,
          password,
        });
        if (data?.token) {
          Cookies.set('token', data.token);

          setUser(data.user);
          if (data.user.userType == 'admin' || data.user.userType == 'system')
            window.location.pathname = '/admin';
          else window.location.pathname = '/account';
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
  };
  const signup = async (email, password, username, phone) => {
    const token = Cookies.get('token');

    if (!token) {
      try {
        const { data: data } = await axios.post(
          `${urls['test']}/auth/register`,
          {
            email,
            password,
            username,
            phone,
            isAdmin: false,
          }
        );

        if (data?.token) {
          Cookies.set('token', data.token);

          setUser(data.user);
          window.location.pathname = '/account';
        }
      } catch (err) {
        console.log(err.response.data.message);
      }
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    window.location.pathname = '/login';
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        loading,
        logout,
        categories,
        locations,
        districts,
        signup,
        ads,
        setAds,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
