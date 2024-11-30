import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { Container } from 'react-bootstrap';

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

// Main component (will eventually use all the others)
const MosFilmApplication = () => {
  return (
    <Provider store={store}>
      <Container>
        <MainView />
      </Container>
    </Provider>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MosFilmApplication />);