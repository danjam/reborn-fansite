// src/App.tsx - Updated with ImagePreloader
import { ImagePreloader } from '@/components/ImagePreloader';
import { AppRouter } from '@/router';

function App() {
  return (
    <ImagePreloader>
      <AppRouter />
    </ImagePreloader>
  );
}

export default App;
