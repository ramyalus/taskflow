class AuthController < ApplicationController
  def login
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      token = encode_token({ user_id: user.id })
      render json: { token: token }
    else
      render json: { error: "Invalid credentials" }
    end
  end

  def register
    user = User.create(user_params)
    render json: user
  end

  private

  def user_params
    params.permit(:name, :email, :password)
  end

  def encode_token(payload)
    JWT.encode(payload, 'secret')
  end
end