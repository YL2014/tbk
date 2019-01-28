// Context lets us pass a value deep into the component tree
// without explicitly threading it through every component.
// Create a context for the current theme (with "light" as the default).
const ThemeContext = React.createContext({type: 'light'});

class App extends React.Component {
  render() {
    // Use a Provider to pass the current theme to the tree below.
    // Any component can read it, no matter how deep it is.
    // In this example, we're passing "dark" as the current value.
    const type = { type: 'dark' }
    return (
      <ThemeContext.Provider value={type}>
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// A component in the middle doesn't have to
// pass the theme down explicitly anymore.
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // Assign a contextType to read the current theme context.
  // React will find the closest theme Provider above and use its value.
  // In this example, the current theme is "dark".
  // static contextType = ThemeContext;
  render() {
    // return <button theme={this.context}>{this.context.type}</button>;
    return <ThemeContext.Consumer>
      {value => <span>{value.type}</span>}
    </ThemeContext.Consumer>
  }
}

const Index = () => (
  <div>
    <p>Hello Next.js</p>
    <App />
  </div>
)

export default Index