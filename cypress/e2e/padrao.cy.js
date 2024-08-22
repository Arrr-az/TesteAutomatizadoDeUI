describe("Teste 1", () => {
  it("passes", () => {
    cy.visit("https://cartao-de-visitas-1f916.web.app");
    cy.get("h2").should("contain", "Catterina Vittorazzi Salvador");
    cy.get("p").should("contain", "Trainee");

    for (let i = 1; i <= 6; i++) {
      cy.get(
        `:nth-child(${i}) > .col > .card > a.ng-tns-c2007924471-1 > .card-content`
      ).should("be.visible");
    }
  });
});

beforeEach(() => {
  cy.visit("https://cartao-de-visitas-1f916.web.app");
});

describe("Teste 2", () => {
  it("passes", () => {
    cy.get(
      ":nth-child(1) > .col > .card > a.ng-tns-c2007924471-1 > .card-content"
    ).click();
    cy.url().should(
      "be.equals",
      "https://cartao-de-visitas-1f916.web.app/email"
    );
  });
});
describe("Teste 3", () => {
  it("passes", () => {
    cy.get(
      ":nth-child(6) > .col > .card > a.ng-tns-c2007924471-1 > .card-content"
    ).click();
    cy.url().should(
      "be.equals",
      "https://cartao-de-visitas-1f916.web.app/surprise"
    );
  });
});
describe("Teste 4", () => {
  it("passes", () => {
    cy.get(":nth-child(2) > .col > .card > a.ng-tns-c2007924471-1")
      .should("have.attr", "href")
      .and("include", "https://wa.me/5528999596505");
  });
});
describe("Teste 5", () => {
  it("passes", () => {
    cy.get(":nth-child(3) > .col > .card > a.ng-tns-c2007924471-1")
      .should("have.attr", "href")
      .and("include", "https://www.instagram.com/catterinasalvador/");
  });
});
describe("Teste 6", () => {
  it("passes", () => {
    cy.get(":nth-child(4) > .col > .card > a.ng-tns-c2007924471-1")
      .should("have.attr", "href")
      .and(
        "include",
        "https://www.linkedin.com/in/catterina-salvador-2708035b/"
      );
  });
});
describe("Teste 7", () => {
  it("passes", () => {
    cy.get(":nth-child(5) > .col > .card > a.ng-tns-c2007924471-1 ")
      .should("have.attr", "href")
      .and("include", "https://www.github.com/catterinavs");
  });
});

describe("Teste 8", () => {
  it("passes", () => {
    cy.get(
      ":nth-child(1) > .col > .card > a.ng-tns-c2007924471-1 > .card-content"
    ).click();
    for (let i = 1; i <= 3; i++) {
      cy.get(`.contact-form >:nth-child(${i})`)
        .should("be.visible")
        .and("not.have.attr", "readonly");
      cy.get('[type="submit"]').should("be.disabled");
    }
  });
});

describe("Teste 9", () => {
  it("passes", () => {
    // Navega até a página de email
    cy.get(
      ":nth-child(1) > .col > .card > a.ng-tns-c2007924471-1 > .card-content"
    ).click();
    cy.url().should(
      "be.equals",
      "https://cartao-de-visitas-1f916.web.app/email"
    );

    const inputNome = "aaa";
    const inputEmail = "bbb@mail.com";
    const inputMensagem = "ccc";

    // Insere texto nos campos
    cy.get(`.contact-form >:nth-child(${1})>:input`).type(inputNome);
    cy.get(`.contact-form >:nth-child(${2})>:input`).type(inputEmail);
    cy.get(`.contact-form >:nth-child(${3})>:input`).type(inputMensagem);

    // Volta à home e checa se os valores dos campos estão salvos na rota
    cy.get("button.black").click();
    cy.url().should(
      "include",
      `/home?user_name=${inputNome}&user_email=${inputEmail}&message=${inputMensagem}`
    );

    // Navega até a página de email novamente
    cy.get(
      ":nth-child(1) > .col > .card > a.ng-tns-c2007924471-1 > .card-content"
    ).click();
    cy.url().should(
      "be.equals",
      "https://cartao-de-visitas-1f916.web.app/email"
    );

    //Checa se os campos possuem os mesmos valores da rota
    cy.get(`.contact-form >:nth-child(${1})>:input`)
      .invoke("val")
      .then((conteudoNome) => {
        expect(conteudoNome).to.equal(inputNome);
      });

    cy.get(`.contact-form >:nth-child(${2})>:input`)
      .invoke("val")
      .then((conteudoEmail) => {
        expect(conteudoEmail).to.equal(inputEmail);
      });

    cy.get(`.contact-form >:nth-child(${3})>:input`)
      .invoke("val")
      .then((conteudoMensagem) => {
        expect(conteudoMensagem).to.equal(inputMensagem);
      });
  });
});

describe("Teste 10", () => {
  it("passes", () => {
    cy.get(
      ":nth-child(1) > .col > .card > a.ng-tns-c2007924471-1 > .card-content"
    ).click();
    for (let i = 1; i <= 2; i++) {
      const inputSelector = `.contact-form > :nth-child(${i}) > input`;

      cy.get(inputSelector).focus();

      cy.get(inputSelector).should("not.have.class", "erro");

      cy.get("body").click({ force: true });

      cy.wait(1000);

      cy.get(`.contact-form > :nth-child(${i}) > label`)
        .invoke("text")
        .then((labelText) => {
          cy.get(inputSelector).should("have.class", "erro");
          cy.get(`.contact-form > :nth-child(${i}) > div`).should(
            "contain.text",
            `${labelText} é obrigatório!`
          );
        });
    }

    let texAreaSelector = ".contact-form > :nth-child(3) > textarea";
    cy.get(texAreaSelector).focus();
    cy.get(texAreaSelector).should("not.have.class", "erro");
    cy.get("body").click({ force: true });
    cy.get(`.contact-form > :nth-child(3) > div`)
      .should("have.class", "erro")
      .and("contain.text", `Mensagem é obrigatório!`);
  });
});

describe("Teste 11", () => {
  it("passes", () => {
    cy.get(
      ":nth-child(1) > .col > .card > a.ng-tns-c2007924471-1 > .card-content"
    ).click();

    for (let i = 1; i <= 2; i++) {
      const inputSelector = `.contact-form > :nth-child(${i}) > input`;

      cy.get(inputSelector).focus();
      cy.get(inputSelector).clear().type(" ");
      cy.get("body").click({ force: true });

      cy.wait(1000);

      cy.get(inputSelector).should("have.class", "erro");
      const labelSelector = `.contact-form > :nth-child(${i}) > label`;
      cy.get(labelSelector)
        .invoke("text")
        .then((labelText) => {
          cy.log("Conteúdo do label:", labelText);
        });
    }

    const texAreaSelector = ".contact-form > :nth-child(3) > textarea";

    cy.get(texAreaSelector).focus();
    cy.get(texAreaSelector).clear().type(" ");
    cy.get("body").click({ force: true });

    cy.wait(1000);

    cy.get(`.contact-form > :nth-child(3) > .div`)
      .should("have.class", "erro")
      .and("contain.text", "Mensagem é obrigatório!");
  });
});

describe("Teste 12", () => {
  it("passes e preenche valores corretamente", () => {
    cy.get(
      ":nth-child(1) > .col > .card > a.ng-tns-c2007924471-1 > .card-content"
    ).click();

    const texAreaSelector = ".contact-form > :nth-child(3) > textarea";

    // Teste definindo valores nos inputs
    for (let i = 1; i <= 2; i++) {
      const inputSelector = `.contact-form > :nth-child(${i}) > input`;

      cy.get(inputSelector).focus();
      cy.get(inputSelector).clear().type(`fr@gmail.com`);
      cy.get("body").click({ force: true });

      cy.wait(1000);

      // Verifica se a classe de erro foi removida
      cy.get(inputSelector).should("not.have.class", "erro");
    }

    // Teste definindo valor no textarea
    cy.get(texAreaSelector).focus();
    cy.get(texAreaSelector)
      .clear()
      .type("Mensagem de teste preenchida corretamente");
    cy.get("body").click({ force: true });

    cy.wait(1000);

    // Verifica se a classe de erro foi removida
    cy.get(texAreaSelector).should("not.have.class", "erro");

    cy.get('[type="submit"]').should("not.have.attr", "disabled");
  });
});

describe("Teste 13", () => {
  it("passes", () => {
    cy.get(
      ":nth-child(6) > .col > .card > a.ng-tns-c2007924471-1 > .card-content"
    ).click();

    let img = `app-surprise > div > img`;
    cy.get(img).should(($img) => {
      const src = $img.attr("src");
      expect(src).to.not.be.empty;
    });

    cy.get(img).siblings().first().should("be.visible");

    cy.get(`app-surprise > div > img + div + div`).should("be.visible").click();

    cy.url().should("eq", "https://cartao-de-visitas-1f916.web.app/home");
  });
});
