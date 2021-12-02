import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
})
export class DashboardHeaderComponent {
  navigation = ['Candidates', 'Planning', 'Educational programs', 'Letters', 'Report'];
  user = localStorage.getItem('email');

  constructor(public matDialog: MatDialog, private authenticationService: AuthenticationService) {}

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
