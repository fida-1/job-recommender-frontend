// src/app/app-routing.module.ts (ou routes.ts)
import { Routes } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { FullHomeComponent } from './full-home/full-home.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';

import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { ProfileListComponent } from './components/profile-list/profile-list.component';
import { JobOfferListComponent } from './components/job-offer-list/job-offer-list.component';
import { CvComponent } from './components/cv/cv.component';
import { ActionLogListComponent } from './components/action-log-list/action-log-list.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { AuthGuard } from './services/auth.guard';
import { CompanyHomeComponent } from './company-home/company-home.component';
import { JobOfferDetailComponent } from './job-offer-detail/job-offer-detail.component';
import { PostJobComponent } from './post-job/post-job.component';
import { ViewPostedJobsComponent } from './view-posted-jobs/view-posted-jobs.component';
import { EditJobComponent } from './edit-job/edit-job.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SearchResultsComponent } from './search-results/search-results.component';

export const routes: Routes = [
  // Page d'accueil publique
  { path: '', component: HomeComponent },

  // Routes publiques
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutComponent },
  { path: 'edit-job/:id', component: EditJobComponent },
  { path: 'edit-profile',   component: EditProfileComponent },
  { path: 'search-results', component: SearchResultsComponent },


  // Routes privées (nécessitent d'être connecté)
  { path: 'full-home',       component: FullHomeComponent,     canActivate: [AuthGuard] },
  { path: 'job-offers/:id', component: JobOfferDetailComponent, canActivate: [AuthGuard] },

  { path: 'create-profile',  component: CreateProfileComponent, canActivate: [AuthGuard] },
  { path: 'candidates',      component: CandidateListComponent,canActivate: [AuthGuard] },
  { path: 'profiles',        component: ProfileListComponent,  canActivate: [AuthGuard] },
  { path: 'job-offers',      component: JobOfferListComponent, canActivate: [AuthGuard] },
  { path: 'cvs',             component: CvComponent,           canActivate: [AuthGuard] },
  { path: 'action-logs',     component: ActionLogListComponent,canActivate: [AuthGuard] },
  { path: 'ai',              component: RecommendationComponent, canActivate: [AuthGuard] },
  { path: 'company-home', component: CompanyHomeComponent },
  { path: 'post-job', component: PostJobComponent },
  { path: 'view-posted-jobs', component: ViewPostedJobsComponent },


  // Wildcard : toute autre route renvoie à l'accueil
  { path: '**', redirectTo: '' }
];
