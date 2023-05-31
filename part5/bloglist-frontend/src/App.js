import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  // if (user === null) {
  //   return (
  //     <div>
  //       <h2>Log in to application</h2>
  //       <form>
  //         <input type='text' placeholder='username'/>
  //         <input type='password' placeholder='password'/>
  //       </form>
  //     </div>
  //   )
  // }

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App