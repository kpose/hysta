import React, {
  useState,
  createContext,
  FC,
  useCallback,
  useContext,
} from 'react';

interface IThemeContext {
  dark: boolean;
  toggleTheme?: () => void;
}

const defaultState = {
  dark: false,
};

const ThemeContext = createContext<IThemeContext>(defaultState);

export const ThemeProvider: FC = ({children}) => {
  const [dark, setDark] = useState(defaultState.dark);

  const toggleTheme = useCallback(() => {
    setDark(!dark);
  }, [dark]);

  return (
    <ThemeContext.Provider value={{dark, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
