import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Pagination,
    Skeleton,
} from "@nextui-org/react";
import { PlusIcon } from "@/icons/PlusIcon";
import { VerticalDotsIcon } from '@/icons/VerticalDotsIcon';
import { SearchIcon } from "@/icons/SearchIcon";
import { columns } from "../../pages/resultados/data";
import { formatDate } from "@/utils/format";

const INITIAL_VISIBLE_COLUMNS = ["name", "actions"];

export const MyTable = ({ data, dataLoading, handleEdit, handleDelete }) => {
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [sortDescriptor, setSortDescriptor] = React.useState({
        column: "name",
        direction: "ascending",
    });
    const [page, setPage] = React.useState(1);

    const transformData = (data) => {
        return data.map(item => ({
            id_resultado: item.id_resultado,
            nombre_resultado: item.nombre_resultado,
            fecha_registro: formatDate(item.fecha_registro),
        }));
    };

    const filteredData = React.useMemo(() => {
        if (!data) return [];

        let transformedData = transformData(data);

        if (filterValue) {
            transformedData = transformedData.filter((item) =>
                item.nombre_resultado.toLowerCase().includes(filterValue.toLowerCase())
            );
        }

        return transformedData;
    }, [data, filterValue]);

    const pages = Math.ceil(filteredData.length / rowsPerPage || 1);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredData.slice(start, end);
    }, [page, filteredData, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((item, columnKey) => {
        const cellValue = item[columnKey];

        switch (columnKey) {
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light">
                                    <VerticalDotsIcon className="text-default-300" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem
                                    onClick={() => handleEdit(item)}
                                >Edit</DropdownItem>
                                <DropdownItem
                                    onClick={() =>
                                        handleDelete(item.id_resultado)}
                                >Delete</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return cellValue;
        }
    }, [handleDelete]);

    React.useEffect(() => {
        setPage(1);
    }, []);

    const topContent = React.useMemo(() => {
        return (
            <section className="flex w-full">
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex w-full justify-between gap-3 px-8">
                        <Input
                            isClearable
                            className="w-full sm:max-w-[44%]"
                            placeholder="Buscar por nombre..."
                            startContent={<SearchIcon />}
                            value={filterValue}
                            onClear={() => setFilterValue('')}
                            onValueChange={(value) => setFilterValue(value)}
                        />
                        <Button
                            color="primary"
                            endContent={<PlusIcon />}
                        >
                            Agregar
                        </Button>
                    </div>
                </div>
            </section>
        );
    }, [filterValue]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
            </div>
        );
    }, [page, pages]);

    return (
        <Table
            aria-label="Store table with custom cells, pagination and sorting"
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{ wrapper: "max-h-[682px] h-[682px]" }}
            selectedKeys={selectedKeys}
            selectionMode="single"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={
                dataLoading ? (
                    <div className="flex flex-col gap-8 mt-4">
                        {Array.from({ length: 12 }).map((_, rowIndex) => (
                            <div className="flex flex-row gap-40" key={rowIndex}>
                                {columns.map((column, colIndex) => (
                                    <Skeleton key={colIndex} className="h-3 w-60 rounded-lg" />
                                ))}
                            </div>
                        ))}
                    </div>
                ) : "No data found"
            } items={dataLoading ? [] : sortedItems}>
                {!dataLoading && sortedItems.map((item) => (
                    <TableRow key={item.id_resultado}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
