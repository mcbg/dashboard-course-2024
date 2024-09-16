
import * as trireme from "./src/main.jsx"
trireme.render(
  'root',
  trireme.getConfigFromAPI('http://localhost:8999/api/getState')
)
