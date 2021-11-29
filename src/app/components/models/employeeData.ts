//NOT FINAL FORM, OTHER INTERFACES NEED TO BE READY FIRST
export interface EmployeeData {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  passw: string;
  roleId: string;
  role: {
    id: string;
    roleName: string;
    employees: [];
  };
}
