from src.model import Employee, PayDetails, PayBenefit, PayRelief, Benefit, Paye, Relief

class PaySlipController:
	@staticmethod
	def employeePayReport(employee_id):
		pay_slip = {}
		
		total_non_taxable_earn=0
		total_non_taxable_deduct=0
		total_taxable_earn = 0
		total_relief=0
		tax=0
		taxable_salary=0
		benefit_list = []
		paye_list=[]
		relief_list=[]

		employee=Employee.get_by_id(long(employee_id))
		payroll_entry = employee.paydetails_set.filter("active =", True).fetch(1)[0]

		pay_benefits = payroll_entry.paybenefit_set.fetch(1000)
		gross_salary = payroll_entry.gross_salary

		for pay_benefit in pay_benefits:
			if not pay_benefit.benefit.taxable:
				if pay_benefit.benefit.perc:
					earn_amt=(pay_benefit.benefit.amount/100) * gross_salary
				else:
					earn_amt=pay_benefit.benefit.amount

				benefit_list.append({"name":pay_benefit.benefit.name, "amount":earn_amt, "taxable":"no"})

				if pay_benefit.benefit.deduct:
					total_non_taxable_deduct+=pay_benefit.benefit.amount
				else:
					total_non_taxable_earn+=pay_benefit.benefit.amount
			else:
				if pay_benefit.benefit.perc:
					earn_amt=(pay_benefit.benefit.amount/100) * gross_salary
				else:
					earn_amt=pay_benefit.benefit.amount

				benefit_list.append({"name":pay_benefit.benefit.name, "amount":earn_amt, "taxable":"yes"})

				total_taxable_earn+=earn_amt

		taxable_salary=gross_salary - (total_non_taxable_deduct + total_non_taxable_earn)
		taxable_salary+=total_taxable_earn

		for paye in Paye.all():	
			taxable_salary-=tax	

			if taxable_salary>=paye.mlbound:
				if taxable_salary>paye.mubound:
					if tax<=0:
						tax=0
						before_relief=0
					else:
						before_relief = (paye.rate/100)*(paye.mubound-paye.mlbound)
						tax+=before_relief

					paye_list.append({"mlbound":paye.mlbound,
										"mubound":paye.mubound,
										"rate":paye.rate,
										"tax":before_relief,
										"tax_after_relief":tax})
				else:
					before_relief=(paye.rate/100)*(gross_salary-paye.mlbound)
					tax+=before_relief
					paye_list.append({"mlbound":paye.mlbound,
										"mubound":paye.mubound,
										"rate":paye.rate,
										"tax":before_relief,
										"tax_after_relief":tax})

		for pay_relief in payroll_entry.payrelief_set:
			if pay_relief.relief.active:
				total_relief+=pay_relief.relief.monthly
				relief_list.append({"name":pay_relief.relief.name, 
									"amount":pay_relief.relief.monthly})


		post_tax_salary = gross_salary - (tax - total_relief)
		post_tax_salary -= total_non_taxable_deduct
		post_tax_salary += total_non_taxable_earn
		net_salary = post_tax_salary + total_taxable_earn

	   
		pay_slip.update(surname=employee.surname, 
					othernames=employee.othernames,
					gross_salary=gross_salary,
					benefits=benefit_list,
					total_non_taxable_deduct=total_non_taxable_deduct,
					total_non_taxable_earn=total_non_taxable_earn,
					total_taxable_earn=total_taxable_earn,
					taxable_salary=taxable_salary,
					tax=tax,
					paye=paye_list,
					relief=relief_list,
					net_salary=net_salary)

		return pay_slip

