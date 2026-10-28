-- Initial schema for Zenith
DROP TABLE IF EXISTS employees;
CREATE TABLE employees (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  location TEXT NOT NULL,
  email TEXT NOT NULL
);

DROP TABLE IF EXISTS policies;
CREATE TABLE policies (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL
);

DROP TABLE IF EXISTS tasks;
CREATE TABLE tasks (
  id TEXT PRIMARY KEY,
  employee_id TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(employee_id) REFERENCES employees(id)
);

-- Seed data
INSERT INTO employees (id, name, role, location, email) VALUES 
('emp-1', 'Alex Rivers', 'Software Engineer Intern', 'Austin', 'alex@cloudflare.com'),
('emp-2', 'Jordan Smith', 'Recruiting Manager', 'San Francisco', 'jordan@cloudflare.com');

INSERT INTO policies (id, title, content, category) VALUES 
('pol-1', 'PTO Policy', 'Employees receive 20 days of PTO per year. Requests must be submitted 2 weeks in advance via Zenith or Workday.', 'HR'),
('pol-2', 'Expense Reimbursement', 'Travel expenses up to $500 can be auto-approved. Anything above requires manager approval.', 'Finance'),
('pol-3', 'Austin Office Access', 'Austin office is open 24/7. Use your badge for entry. Guest registration is required.', 'Places');
