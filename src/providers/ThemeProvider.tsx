import React, {
  useState,
  createContext,
  FC,
  useCallback,
  useContext,
  ReactNode,
} from 'react';

interface IThemeContext {
  dark: boolean;
  toggleTheme?: () => void;
}
interface BaseLayoutProps {
  children: ReactNode;
}

const defaultState = {
  dark: false,
};

const ThemeContext = createContext<IThemeContext>(defaultState);

export const ThemeProvider: FC<BaseLayoutProps> = ({children}) => {
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
