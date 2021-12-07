import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
})
export class DashboardHeaderComponent implements OnInit {
  navigation = ['Candidates', 'Planning', 'Educational programs', 'Letters', 'Report'];
  user = localStorage.getItem('email');
  showPlanning = true;
  showEducationalPrograms = false;
  showLetters = false;
  showReport = false;

  constructor(public matDialog: MatDialog, private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.getUserRole();
  }

  getUserRole() {
    this.authenticationService.getEmployee(localStorage.getItem('id') || '').subscribe((data) => {
      const role = data.empPosition;
      if (role === 'Manager') {
        this.showPlanning = false;
        this.showReport = true;
      }
      if (role === 'Administrator') {
        this.showEducationalPrograms = true;
        this.showLetters = true;
        this.showReport = true;
      }
      if (role === 'Recruiter') {
        this.showLetters = true;
      }
    });
  }

  logOut() {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure want to log out?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No',
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) this.authenticationService.logout();
    });
  }
}
