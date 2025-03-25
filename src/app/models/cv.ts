export interface CV {
    id?: number;
    fileName: string;
    fileType: string;
    data: string; // Contenu du fichier encodé en base64
    profileId: number;  // Pour lier ce CV à un profile
  }
  