import { screen, render, fireEvent } from "@testing-library/react";
import { rest } from "msw";

import { server } from "../../mocks/server";
import Payment from "../Payment";

// Enable API mocking before tests
beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }));

// Reset any runtime request handlers we may add during the tests
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done
afterAll(() => server.close());

const fillInputs = () => {
  const cardInput: HTMLInputElement = screen.getByLabelText("Número do cartão");
  fireEvent.change(cardInput, { target: { value: "4111111111111111" } });
  expect(cardInput.value).toBe("4111 1111 1111 1111");

  const nameInput: HTMLInputElement = screen.getByLabelText(
    "Nome (igual ao cartão)"
  );
  fireEvent.change(nameInput, { target: { value: "Rogério M" } });
  expect(nameInput.value).toBe("Rogério M");

  const expiryInput: HTMLInputElement = screen.getByLabelText("Validade");
  fireEvent.change(expiryInput, { target: { value: "0430" } });
  expect(expiryInput.value).toBe("04/30");

  const cvvInput: HTMLInputElement = screen.getByLabelText("CVV");
  fireEvent.change(cvvInput, { target: { value: "123" } });
  expect(cvvInput.value).toBe("123");

  fireEvent.click(screen.getByTestId("select"));
  fireEvent.click(screen.getByText("1x R$ 12.000,00 sem juros"));
};

describe("if has campaign id without data in the redux store, makes a request to get data", () => {
  it("in case of success request, it shows a success message", async () => {
    server.use(
      rest.post("/pagar", (req, res, ctx) => {
        return res(ctx.status(200));
      })
    );

    render(<Payment />);

    fillInputs();

    const successText = "Cartão adicionado com sucesso!";

    const message = screen.queryByText(successText);

    expect(message).toBeNull();

    fireEvent.click(screen.getByText("CONTINUAR"));

    const successMessage = await screen.findByText(successText);

    expect(successMessage).toBeVisible();
  });

  it("in case of failed request, it shows a error message", async () => {
    server.use(
      rest.post("/pagar", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<Payment />);

    fillInputs();

    const ErrorText = "Erro ao adicionar cartão!";

    const message = screen.queryByText(ErrorText);

    expect(message).toBeNull();

    fireEvent.click(screen.getByText("CONTINUAR"));

    const successMessage = await screen.findByText(ErrorText);

    expect(successMessage).toBeVisible();
  });

  it("should show input error messages if fields were empty", () => {
    render(<Payment />);

    fireEvent.click(screen.getByText("CONTINUAR"));

    const cardNumberErrorMessage = screen.getByText(
      "Número de cartão inválido"
    );
    const nameErrorMessage = screen.getByText("Insira seu nome completo");
    const expiryErrorMessage = screen.getByText("Data inválida");
    const cvvErrorMessage = screen.getByText("Código inválido");
    const portionErrorMessage = screen.getByText("Insira o número de parcelas");

    expect(cardNumberErrorMessage).toBeInTheDocument();
    expect(nameErrorMessage).toBeInTheDocument();
    expect(expiryErrorMessage).toBeInTheDocument();
    expect(cvvErrorMessage).toBeInTheDocument();
    expect(portionErrorMessage).toBeInTheDocument();
  });
});
