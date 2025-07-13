import { useState } from 'react'
import { PostsPage } from './posts_page/components/posts_page';

function App() {
  const [count, setCount] = useState(0)

  return PostsPage();
}

export default App
