import { useState, useMemo, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { CssBaseline, PaletteMode, ThemeProvider, createTheme } from '@mui/material';
import Container from '@mui/material/Container';

import { ColorModeContext } from 'context/colorMode';
import { getDesignTokens } from 'styles/theme';
import AppNav from './AppNav';

interface Props {
  children?: ReactNode;
}

function AppLayout({ children }: Props) {
  const [mode, setMode] = useState<PaletteMode>('light'); // React.useState<'light' | 'dark'>
  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />

        <AppNav theme={theme} />
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          {children}
        </Container>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
