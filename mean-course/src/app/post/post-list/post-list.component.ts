import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostService} from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  constructor(public postService: PostService) {
  }

  private postSubscription: Subscription;
  isLoading = false;
  /*  Left here for reference
      posts = [
      {title: 'First Post', content: 'This is the first post content'},
      {title: 'Second Post', content: 'This is the second post content'},
      {title: 'Third Post', content: 'This is the third post content'}
    ] */

  posts: Post[] = [];

  ngOnInit() {
    this.isLoading = true;     // spinner
    this.postService.getPosts();
    this.postSubscription = this.postService.getPostUpdateListener().subscribe((postsReceived: Post[]) => {
      setTimeout(() => {this.isLoading = false}, 4000);
      this.posts = postsReceived;
    });
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }

  onDelete(postId: string) {
    this.postService.deletePost(postId);
  }

}
