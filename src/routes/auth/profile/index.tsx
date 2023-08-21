import ButtonGroup from '@/components/Buttons/ButtonGroup'
import DeleteButton from '@/components/Buttons/DeleteButton'
import EditButton from '@/components/Buttons/EditButton'
import DataTable from '@/components/DataTable'
import Heading from '@/components/Heading'
import { Column, ColumnButtons } from '@/lib/DataTables'
import { renderToString } from 'react-dom/server'

const ProfilePage = () => {
  const columns = [
    Column('id', { visible: false }),
    Column('name'),
    Column('registered'),
    ColumnButtons({
      render: (data, type, row, meta) =>
        renderToString(
          ButtonGroup({
            children: [
              EditButton({ url: `auth/profile/webauthn/edit/${row['id']}` }),
              DeleteButton({ url: `auth/profile/webauthn/delete/${row['id']}` }),
            ],
          }),
        ),
    }),
  ]

  return (
    <div>
      <Heading headings={['User profile']} />
      <table className="table table-sm auth-user-profile">
        <tbody>
          <tr>
            <th>username</th>
            <td>
              user.username{' '}
              <a className="btn btn-outline-secondary" href="/auth/profile/changepassword">
                Change password
              </a>
            </td>
          </tr>

          <tr>
            <th>email</th>
            <td>user.email</td>
          </tr>

          <tr>
            <th>2fa authentication</th>
            <td>
              {/* tfa_state = ['disabled', 'Enable'] or tfa_state = ['enabled', 'Disable'] */}
              {'tfa_state[0]'}
              <a className="btn btn-outline-secondary" href="{{ url_for('auth.profile_totp_route') }}">
                tfa_state[1]
              </a>
            </td>
          </tr>

          <tr>
            <th>webauthn credentials</th>
            <td>
              <div id="profile_webauthn_table_toolbar" className="dt_toolbar">
                <a className="btn btn-outline-secondary" href="{{ url_for('auth.profile_webauthn_register_route') }}">
                  Register new
                </a>
              </div>
              <DataTable
                ajax={{ url: 'http://localhost:18000/auth/profile/webauthn/list.json', type: 'POST' }}
                columns={columns}
                ordering={false}
                paging={false}
                info={false}
                searching={false}
              />
            </td>
          </tr>

          <tr>
            <th>apikey</th>
            <td>
              <form className="form-inline" style={{ display: 'inline' }} method="post">
                <button className="btn btn-outline-secondary" type="submit">
                  Generate
                </button>{' '}
              </form>
              {/* {userInfo.apikey && */}
              {true && (
                <>
                  <form className="form-inline" style={{ display: 'inline' }} method="post">
                    <button className="btn btn-outline-secondary" type="submit">
                      Revoke
                    </button>{' '}
                  </form>
                  <span className="badge badge-info">apikey set</span>
                </>
              )}
              {/* {new_apikey && */}
              {true && <div className="alert alert-warning">new apikey fsdfsgfdgdh_api_key_gdfhgfhgfhfg</div>}
            </td>
          </tr>
          <tr>
            <th>api_networks</th>
            <td>user.api_networks</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
export default ProfilePage
