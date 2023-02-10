import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react';

//api here is an axios instance which has the baseURL set according to the env.
import axios from 'axios';
import urls from 'constants/api';
import { getCookie, setCookie } from 'cookies-next';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState();
  const [districts, setDistricts] = useState();
  const [locations, setLocations] = useState();
  const [ads, setAds] = useState();


  async function loadUserFromCookies() {
    const token = Cookies.get('token');
    setLoading(true)
    try {
      const { data: category } = await axios.get(`${urls['test']}/category`);
      setCategories(category.categories);
      const { data: district } = await axios.get(`${urls['test']}/district`);
      setDistricts(district);
      const { data: location } = await axios.get(`${urls['test']}/location`);
      setLocations(location);
    } catch (e) {
      setLoading(false)
      console.log(e);
    }
    if (token && token != undefined) {
      try {
       
        const { data: data } = await axios.get(`${urls['test']}/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Headers': '*',
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
    const token = getCookie('token');

    if (!token) {
      setLoading(true)
      try {
        const { data: data } = await axios.post(`${urls['test']}/auth/login`, {
          email,
          password,
        });
        if (data?.token) {
          setCookie('token', data.token);

          setUser(data.user);
          if (data.user.userType == 'admin' || data.user.userType == 'system')
            window.location.pathname = '/admin';
          else window.location.pathname = '/account';
        }
      } catch (error) {
        setLoading(false)
        console.log(error);
      }
      setLoading(false)
    }
  };
  const signup = async (email, password, username, phone) => {
    const token = Cookies.get('token');

    if (!token) {
      setLoading(true)
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
        setLoading(false)
        console.log(err.response.data.message);
      }
    }
    setLoading(false)
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    setLoading(false)
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
