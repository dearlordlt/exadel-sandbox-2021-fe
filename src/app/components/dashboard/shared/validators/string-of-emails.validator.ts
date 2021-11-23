import { AbstractControl } from '@angular/forms';

export function ValidateStringOfEmails(control: AbstractControl): { [key: string]: string } | null {
  const emails: string[] = control.value.split(',');
  const trimmedEmails: string[] = emails.map((email) => email.trim());

  const filter = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  for (const email of trimmedEmails) {
    if (!filter.test(email)) {
      return { invalidEmail: email };
    }
  }

  return null;
}
