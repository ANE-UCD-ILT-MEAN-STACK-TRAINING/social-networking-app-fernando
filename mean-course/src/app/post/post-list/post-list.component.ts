import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {Post} from '../post.model';
import {PostService} from '../post.service';
import {PageEvent} from '@angular/material/paginator';


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
  posts: Post[] = [];
  totalPosts = 10;
  postsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  ngOnInit() {
    this.isLoading = true;     // spinner
    this.postService.getPosts(this.postsPerPage, this.currentPage);
    this.postSubscription = this.postService.getPostUpdateListener()
      .subscribe((postData: { posts: Post[]; postCount: number}) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postService.deletePost(postId).subscribe(() => {
      this.postService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

}
