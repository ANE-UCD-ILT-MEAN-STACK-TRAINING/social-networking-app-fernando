import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Post} from './post.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[]; postCount: number }>();

  constructor(private http: HttpClient, private router: Router) {
  }

  getPosts(postPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        'http://localhost:3000/api/posts' + queryParams)
      .pipe(
        map((postData) => {
          return {
            posts: postData.posts.map((post) => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath,
              };
            }),
            maxPosts: postData.maxPosts,
          };
        })
      )
      .subscribe((transfromedPosts) => {
        this.posts = transfromedPosts.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transfromedPosts.maxPosts,
        });
      });

  }


  getPost(id: string) {
    // return {...this.posts.find(p => {
    //    return p.id === id;
    //  })};

    return this.http.get<{ _id: string, title: string, content: string, imagePath: string }>
    ('http://localhost:3000/api/posts/' + id);
  }


  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

// addPost( title: string, content: string) {
//   const post: Post = { title, content};
//   this.posts.push(post);
//   this.postsUpdated.next([...this.posts]);
// }

  addPost(
    title: string,
    content: string,
    image: File ) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);

    // @ts-ignore
    this.http
      .post<{ message: string; post: Post }>(
        'http://localhost:3000/api/posts',
        postData
      )

      .subscribe(() => {                // responseData

        // const post: Post = {
        //   id: responseData.post.id,
        //   title,
        //   content,
        //   imagePath: responseData.post.imagePath
        // };
        //
        // this.posts.push(post);
        // this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  deletePost(postId: string) {
    return this.http.delete('http://localhost:3000/api/posts/' + postId);
      // .subscribe(() => {
      //   const updatedPosts = this.posts.filter((post) => post.id !== postId);
      //   this.posts = updatedPosts;
      //   this.postsUpdated.next([...this.posts]);
      // });
  }

  updatedPost(id: string, title: string, content: string, image: File | string ) {
    // const post: Post = {id, title, content};
    let postData: Post | FormData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      postData = {
        id,
        title,
        content,
        imagePath: image
      };
    }

    this.http.put<{ message: string, postId: string }>('http://localhost:3000/api/posts/' + id, postData)
      .subscribe(responseData => {
        // console.log(responseData);
        // const updatedPosts = [...this.posts];
        // const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
        // const post: Post = {
        //   id,
        //   title,
        //   content,
        //   imagePath: ''
        // };
        // updatedPosts[oldPostIndex] = post;
        // this.posts = updatedPosts;
        // this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });

  }
}
