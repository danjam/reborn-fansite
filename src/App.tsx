// src/App.tsx - Updated with ImagePreloader and ThemeProvider at top level
import { ImagePreloader } from '@/components/ImagePreloader';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AppRouter } from '@/router';

function App() {
  return (
    <ThemeProvider>
      <ImagePreloader>
        <AppRouter />
      </ImagePreloader>
    </ThemeProvider>
  );
}

export default App;
