import React, {useState} from 'react';
import DataTable from 'react-data-table-component';
import Form from 'react-bootstrap/Form';

function StatewiseTable({data}) {
  const [searchState, setsearchState] = useState('');
  const filteredState = [];

  data.map(d => {
    if (searchState !== '' ? d.region.toLowerCase().includes(searchState.toLowerCase()) : null) {
      filteredState.push(d);
    }
    return null;
    });

  const columns = [
    {
       name: 'State',
       selector: 'region',
       sortable: true,
       center: true,
    },
    {
      name: 'Total Infected',
      selector: 'totalInfected',
      sortable: true,
      center: true,
    },
    {
      name: 'Recovered',
      selector: 'recovered',
      sortable: true,
      center: true,
    },
    {
      name: 'Deceased',
      selector: 'deceased',
      sortable: true,
      center: true,
    }
  ];

  const customStyles = {
    headRow: {
      style: {
        border: 'none',
      },
    },
    headCells: {
      style: {
        color: 'white',
        fontSize: '20px',
      },
    },
    rows: {
      highlightOnHoverStyle: {
        backgroundColor: '#04A0A9',
        borderBottomColor: '#FFFFFF',
        borderRadius: '25px',
        outline: '1px solid #FFFFFF',
      },
    },
    pagination: {
      style: {
        border: 'none',
      },
    },
  };

  return(
    <div>
    <Form>
      <Form.Group controlId="formGroupSearch">
        <Form.Control
          type="text"
          placeholder="Search by State"
          onChange={e => {
            setsearchState(e.target.value);
          }}
        />
      </Form.Group>
    </Form>
    <br />
    <DataTable
      columns={columns}
      data={filteredState.length < 1 ? data : filteredState}
      defaultSortField={'totalInfected'}
      defaultSortAsc={false}
      striped
      responsive
      pagination
      customStyles={customStyles}
      theme={'dark'}
      highlightOnHover
      paginationPerPage={5}
      paginationRowsPerPageOptions={[5, 10, 15]}
    />
    </div>
  );
}

export default StatewiseTable;
