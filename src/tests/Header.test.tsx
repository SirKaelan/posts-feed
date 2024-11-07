import { screen, render, fireEvent } from "@testing-library/react";
import { Header } from "../components/Header";
import { AppStateProvider } from "../components/contexts/app/AppStateContextProvider";
import * as getUsersHook from "../components/hooks/useUsers";
import { RequestStatus } from "../types";

test("displays popup form when button is clicked", () => {
  jest.spyOn(getUsersHook, "useUsers").mockReturnValue({
    users: {
      status: RequestStatus.Success,
      data: [
        {
          id: 11,
          name: "test testing",
          username: "test",
          email: "test@test.com",
        },
      ],
    },
  });

  render(
    <AppStateProvider>
      <Header />
    </AppStateProvider>
  );
  expect(screen.queryByRole("dialog")).toBeNull();
  const openButton = screen.getByRole("button", { name: /add new post/i });
  fireEvent.click(openButton);
  expect(screen.queryByRole("dialog")).toBeInTheDocument();
  expect(screen.getByRole("textbox", { name: /title/i })).toBeInTheDocument();
});
