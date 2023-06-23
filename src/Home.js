import React, { useContext } from "react";
import { SnackContext } from "./SnackContext";
import "./home.css";

export const Home = () => {
  const { snackState, snackDispatcher, actionTypes } = useContext(SnackContext);
  const { snackData, searchText, sortColumn, sortDirection } = snackState;
  console.log(snackData.map((snack) => snack.id));
  console.log(snackState.snackData.map((snack) => snack.id));

  const filteredSnacks = snackData?.filter((snack) => {
    const searchTerm = searchText.toLowerCase();
    const productName = snack.product_name.toLowerCase();
    const ingredients = snack.ingredients.map((ingredient) =>
      ingredient.toLowerCase()
    );

    // const ingredients = snack.ingredients.join(" ").toLowerCase().split(" ");

    return productName.includes(searchTerm) || ingredients.includes(searchTerm);
  });

  const handleSearchChange = (e) => {
    snackDispatcher({
      type: actionTypes.UPDATE_SEARCH_TEXT,
      payload: e.target.value,
    });
  };

  const handleSortColumn = (column) => {
    let direction = "asc";

    if (sortColumn === column && sortDirection === "asc") {
      direction = "desc";
    }
    snackDispatcher({
      type: actionTypes.SORT_COLUMN,
      payload: {
        sortColumn: column,
        sortDirection: direction,
      },
    });
  };

  return (
    <div>
      <h1>Snack Table</h1>
      <div
        className="snack-input
    "
      >
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search by name or ingredients"
        />
      </div>
      <div className="snack-table">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSortColumn("id")}>ID</th>
              <th onClick={() => handleSortColumn("product_name")}>
                Product Name
              </th>
              <th onClick={() => handleSortColumn("product_weight")}>
                Product Weight
              </th>
              <th onClick={() => handleSortColumn("price")}>Price</th>
              <th onClick={() => handleSortColumn("calories")}>Calories</th>
              <th onClick={() => handleSortColumn("ingredients")}>
                Ingredients
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSnacks?.map((snack) => (
              <tr key={snack.id}>
                <td>{snack.id}</td>
                <td>{snack.product_name}</td>
                <td>{snack.product_weight}</td>
                <td>{snack.price}</td>
                <td>{snack.calories}</td>
                <td>{snack.ingredients.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
