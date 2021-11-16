import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EducationalProgramsData } from '../../../global/educational-programs-data';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
})
export class PlannerComponent implements OnInit {
  programForm: FormGroup = this.fb.group({
    date: '',
  });

  educationalProgramId: string | null = null;
  educationalProgramName: string | null = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.educationalProgramId = this.route.snapshot.paramMap.get('educationalProgramId');
    if (this.educationalProgramId) {
      this.educationalProgramName = EducationalProgramsData.find((program) => program.id === parseInt(this.educationalProgramId!))?.name!;
    }
  }
}
