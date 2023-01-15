describe("Test connection to the DB", () => {
  it("can create table", () => {
    cy.task(
      "queryDB",
      "CREATE TABLE Students(id int, firstname varchar(255), lastname varchar(255), groupid varchar(255), city varchar(255))"
    );
  });

  it("can insert data to the table", () => {
    cy.task(
      "queryDB",
      `INSERT INTO Students(id, firstname, lastname, groupid, city) VALUES
      (1, "Ivan", "Ivanov", "02-2022", "Barcelona"),
      (2, "Vasya", "Pupkin", "03-2022", "New-York"),
      (3, "Peter", "Petrov", "03-2022", "London"),
      (4, "Galina", "Semina", "04-2022", "Paris"),
      (5, "Milana", "Muller", "03-2022", "Milan"),
      (6, "Vasilisa", "Smit", "03-2022", "Boston"),
      (7, "Maria", "Horkina", "04-2022", "Malaga");
      `
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result.affectedRows).to.eq(7);
    });
  });

  it("can select student with city=Lonodon from the table", () => {
    cy.task(
      "queryDB",
      `Select firstname FROM Students WHERE city = "London"`
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result[0].firstname).to.equal("Peter");
    });
  });

  it("can select student with groupid=03-2022 from the table", () => {
    cy.task(
      "queryDB",
      `Select firstname, lastname, city FROM Students WHERE groupid = "03-2022"`
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result.length).to.equal(4);
    });
  });

  it("can delete table", () => {
    cy.task("queryDB", "DROP TABLE Students");
  });
});

