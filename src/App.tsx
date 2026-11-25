import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Provider } from "react-redux";
import Home from "./pages/Home";
import { store } from "./store/store";

const theme = {
  primaryColor: "leaf",
  colors: {
    leaf: [
      "#f2f8ec",
      "#dfeecd",
      "#c4dfa9",
      "#a7cf83",
      "#8bbf62",
      "#6eaa48",
      "#4f8f38",
      "#3c7330",
      "#315c29",
      "#294b24",
    ] as const,
  },
  fontFamily: "DM Sans, sans-serif",
  headings: { fontFamily: "Fraunces, Georgia, serif" },
  defaultRadius: "md" as const,
};

export default function App() {
  return (
    <Provider store={store}>
      <MantineProvider theme={theme} defaultColorScheme="light">
        <Notifications position="top-right" />
        <Home />
      </MantineProvider>
    </Provider>
  );
}
