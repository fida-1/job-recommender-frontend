export interface Application {
    id?: number;
    candidateId: number;   // ID du candidat (vous pouvez aussi utiliser une interface Candidate si vous la définissez)
    jobOfferId: number;    // ID de l'offre d'emploi
    cvId?: number;         // ID du CV soumis (optionnel)
    coverLetter: string;
    submissionDate: string; // Format ISO (ex: \"2025-03-02\")\n  status: string;      // ex: \"pending\", \"accepted\", \"rejected\"\n}
}  