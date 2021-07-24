import { Suspense, lazy } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { Switch, Route, useLocation } from "react-router-dom";
import { useWidth } from "./hooks/useWidth";
import allReducers from "./reducers";
import GlobalStyles from "./styles/globalStyles";
import MobileNav from "./components/MobileNav";
import DesktopNav from "./components/DesktopNav";
import AppContainer from "./components/AppContainer";
import Fallback from "./components/Fallback";

const store = createStore(allReducers);

const Home = lazy(() => import("./components/home/Home"));
const Genre = lazy(() => import("./components/Genre"));
const Results = lazy(() => import("./components/Results"));
const Details = lazy(() => import("./components/Details"));

const App = () => {
    const width = useWidth();
    const location = useLocation();

    return (
        <Provider store={store}>
            <AppContainer>
                <GlobalStyles />
                {width < 1024 ? <MobileNav /> : <DesktopNav />}
                <Suspense fallback={<Fallback />}>
                    <Switch location={location} key={location.pathname}>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/genres/:name" component={Genre} />
                        <Route
                            exact
                            path="/search/:query"
                            component={Results}
                        />
                        <Route exact path="/movie/:id" component={Details} />
                    </Switch>
                </Suspense>
            </AppContainer>
        </Provider>
    );
};

export default App;
