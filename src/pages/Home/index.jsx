import { Component } from 'react';

import './styles.css';

import { PostCard } from '../../components/PostCard';
import { Button } from '../../components/Button';

import { loadPosts } from '../../services/load-posts';

export class Home extends Component {

  state = {
    title: "First Home",
    posts: [],
    allPosts: [],
    perPage: 7,
    currentPage: 0,
    searchValue: ""
  }

  async componentDidMount() {
    await this.handleLoadPosts();
  }

  handleLoadPosts = async () => {
    const { currentPage, perPage } = this.state;
    const posts = await loadPosts();

    this.setState({
      posts: posts.slice(currentPage, perPage),
      allPosts: posts
    })
  }

  handleToggleButton = () => {
    const { currentPage, perPage, allPosts, posts } = this.state;
    const nextPage = currentPage + perPage;
    const currentPosts = allPosts.slice(nextPage, nextPage + perPage)


    posts.push(...currentPosts);

    this.setState({
      currentPage: nextPage,
      posts
    })
  }

  // handleChangeSearch = (event) => {
  //   const title = event.target.value;
  //   this.setState({
  //     searchValue: title
  //   })
  // }

  handleSubmitFormSearch = (event) => {
    event.preventDefault();

    const title = event.currentTarget.searchPost.value;
    this.setState({
      searchValue: title
    })
  }

  render() {
    const { posts, perPage, currentPage, allPosts, searchValue } = this.state;
    const noMorePosts = perPage + currentPage >= allPosts.length;
    const filteredPosts = searchValue ? allPosts.filter((post) => post.title.toUpperCase().includes(
      searchValue.toUpperCase()
    )) : posts;

    return (
      <div className="container">
        <div className="d-flex justify-content-center">
          <form className="formSearchPost" onSubmit={this.handleSubmitFormSearch}>
            <input
              type="text"
              id="inputSearchPost"
              placeholder="Search a post"
              name="searchPost"
              className="mb-1"
            />
            <Button
              title="Submit"
              type="submit"
            />
          </form>
        </div>

        <div className="posts">
          {
            filteredPosts.map((post) => (
              <PostCard
                cover={post.cover}
                // id={post.id}
                title={post.title}
                body={post.body}
                key={post.id}
              />
            ))
          }
        </div>
        {!searchValue &&
          <Button
            title="Load more"
            handleClick={this.handleToggleButton}
            disabled={noMorePosts}
            type="button"
          />
        }
      </div>
    );
  }
}

export default Home;
