export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  // Getter for token
  get token() {
    // If there is no token or the token expiration date is in the past, return null
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate)
      return null;
    // Otherwise, return the token
    return this._token;
  }
}
