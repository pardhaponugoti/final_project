class Api::SessionsController < ApplicationController
  def new
    if current_user
      @user = current_user
      render :show
    else
      render json: "no current user"
    end
  end

  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if @user.nil?
      render json: ["Username and Password do not match!"], status: 422
    else
      login_user!(@user)
      render :show
    end
  end

  def destroy
    logout_user!
    if current_user.nil?
      render json: { message: "successful sign out" }
    else
      render json: { status: 404 }
    end
  end

end
