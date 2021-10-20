import PostFilter from "../components/PostFilter"

export const getPageCount = (totalCount, limit) => {
    return Math.floor(totalCount / limit)
}

export const getPagesArray = (totalPages) => {
    let result = [];
    for (let i = 0; i < totalPages; i++) {
        result.push(i + 1);
    }
    return result;
}