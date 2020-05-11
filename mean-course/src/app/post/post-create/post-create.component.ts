import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Post } from '../post.model';
import { NgForm} from '@angular/forms';
import { PostService} from '../post.service';
import {ActivatedRoute, ParamMap} from '@angular/router';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(public postsService: PostService, public route: ActivatedRoute) {
  }

  @Output() postCreated = new EventEmitter<Post>();

  private mode = 'create';

  private postId: string;

  post: Post;

//  enteredValue = '';
//  newPost = 'No Content';

  title = '';
  content = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.post = this.postsService.getPost(this.postId);
      } else {
        this.mode = 'create';
        this.postId = null;
       }
    });
  }


  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();

    /*const post: Post = {
      title: form.value.title,
      content: form.value.content
    };
    this.postCreated.emit(post);*/
  }

}
