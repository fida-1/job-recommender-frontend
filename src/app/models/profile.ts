import { CV } from "./cv";

export interface Profile {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    // Vous pouvez ajouter d'autres propriétés si nécessaire
    cvs?: CV[]; // Si vous souhaitez afficher les CV liés
  }
  
  // Pour éviter les références circulaires, vous pouvez définir CV dans un autre fichier
  