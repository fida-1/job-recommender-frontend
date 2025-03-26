import { Routes } from '@angular/router';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { ProfileListComponent } from './components/profile-list/profile-list.component';
import { JobOfferListComponent } from './components/job-offer-list/job-offer-list.component';
import { CvComponent } from './components/cv/cv.component';
import { ActionLogListComponent } from './components/action-log-list/action-log-list.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { HomeComponent } from './home/home.component';  // Importer le composant Home
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Page d'accueil
  { path: 'candidates', component: CandidateListComponent },
  { path: 'about', component: AboutComponent },
  { path: 'profiles', component: ProfileListComponent },
  { path: 'job-offers', component: JobOfferListComponent },
  { path: 'cvs', component: CvComponent },
  { path: 'action-logs', component: ActionLogListComponent },
  { path: 'create-profile', component: CreateProfileComponent } // Route pour créer le profil
];
