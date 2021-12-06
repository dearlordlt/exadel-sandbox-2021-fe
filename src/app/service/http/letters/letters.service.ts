import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LetterTemplate } from 'src/app/components/shared/interfaces/letters/letter-template.interface';
import { Letter } from 'src/app/components/shared/interfaces/letters/letter.interface';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class LettersService {
  constructor(private http: HttpClient) {}

  getLetterTemplate(id: string): Observable<LetterTemplate> {
    const params = new HttpParams().set('Id', id);
    return this.http.get<LetterTemplate>(`${environment.EXADEL_API}/LettersTemp/GetById`, { params: params });
  }

  getLetterTemplates(): Observable<LetterTemplate[]> {
    return this.http.get<LetterTemplate[]>(`${environment.EXADEL_API}/LettersTemp/GetAllLettersTemp`);
  }

  postLetterTemplate(data: LetterTemplate): Observable<LetterTemplate> {
    return this.http.post<LetterTemplate>(`${environment.EXADEL_API}/LettersTemp/AddLettersTemp`, data);
  }

  updateLetterTemplate(id: string, data: LetterTemplate): Observable<LetterTemplate> {
    return this.http.put<LetterTemplate>(`${environment.EXADEL_API}/LettersTemp/${id}`, data);
  }

  deleteLetterTemplate(id: string): Observable<LetterTemplate> {
    const params = new HttpParams().set('Id', id);
    return this.http.delete<LetterTemplate>(`${environment.EXADEL_API}/LettersTemp/DeleteLettersTemp`, { params: params });
  }

  sendLetter(data: Letter): Observable<Letter> {
    return this.http.post<Letter>(`${environment.EXADEL_API}/LettersTemp/SendMail`, data);
  }
}
