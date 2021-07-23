import { Switch, Route, useLocation } from "react-router-dom";
import { useWidth } from "./hooks/useWidth";
import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducers from "./reducers";
import GlobalStyles from "./styles/globalStyles";
import MobileNav from "./components/MobileNav";
import DesktopNav from "./components/DesktopNav";
import AppContainer from "./components/AppContainer";
import Home from "./components/home/Home";
import Genre from "./components/Genre";
import Results from "./components/Results";
import Details from "./components/Details";

const store = createStore(allReducers);

const App = () => {
    const width = useWidth();
    const location = useLocation();

    return (
        <Provider store={store}>
            <AppContainer>
                <GlobalStyles />
                {width < 1024 ? <MobileNav /> : <DesktopNav />}
                <Switch location={location} key={location.pathname}>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/genres/:name" component={Genre} />
                    <Route exact path="/search/:query" component={Results} />
                    <Route exact path="/movie/:id" component={Details} />
                </Switch>
            </AppContainer>
        </Provider>
    );
};

export default App;
