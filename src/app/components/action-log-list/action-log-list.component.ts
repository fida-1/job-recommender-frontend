import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionLog } from '../../models/actionlog';
import { ActionLogService } from '../../services/actionlog.service';

@Component({
  selector: 'app-action-log-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-log-list.component.html',
  styleUrls: ['./action-log-list.component.css']
})
export class ActionLogListComponent implements OnInit {
  logs: ActionLog[] = [];
  errorMessage: string = '';

  constructor(private actionLogService: ActionLogService) {}

  ngOnInit(): void {
    this.getLogs();
  }

  getLogs(): void {
    this.actionLogService.getActionLogs()
      .subscribe({
        next: (data: ActionLog[]) => {
          this.logs = Array.isArray(data) ? data : [];
        },
        error: (err) => {
          console.error('Erreur dans subscribe:', err);
          this.errorMessage = "Erreur de connexion au serveur.";
        }
      });
  }
}
